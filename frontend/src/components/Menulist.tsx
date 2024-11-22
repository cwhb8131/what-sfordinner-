import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import MenuForm from "./MenuForm";
import TrashModal from "./TrashModal";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // ドラッグアイテムタイプを定義
import { supabase } from '../../utils/supabase';

import {
  getMenu,
  updateMenu,
  clearMenu,
} from '../../utils/supabaseFunction'


interface Menu {
  id: number;
  menu: string;
  recipeurl: string;
 
}
interface Weekday {
  weekday: string;
}

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null); // 編集するメニュー
  const [modalVisible, setModalVisible] = useState(false); // モーダル表示状態
  const [menuToClear, setMenuToClear] = useState<Menu | null>(null); // クリアするメニュー

  useEffect(() => {
    getMenu();
  }, []);


  const getMenu = async () => {
    try {
      // Supabaseからメニューリストを取得
      const { data, error } = await supabase
        .from('menus') // "menus"テーブルを指定
        .select('*') // すべてのカラムを取得
        .order('order', { ascending: true }); 
        console.log('Supabase query result:', data, error);

  
      if (error) throw error; // エラーハンドリング
      console.log(data);
      
  
      // メニューリストを更新
      setMenus(data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const updateMenu = async (id: number, menu: string, recipeurl: string) => {
    const json = {
      menu,
      recipeurl,
    };
  
    try {
      const { data, error } = await supabase
        .from('menus') 
        .update(json)
        .eq('id', id); // idが一致する行を更新
  
      if (error) {
        throw error;
      }
  
      getMenu(); // メニューを再取得してリストを更新
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  
  const clearMenu = async (id: number) => {
    // メニューの状態を更新
    const updatedMenus = menus.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          menu: "",
          recipeurl: "",
        };
      }
      return menuItem;
    });
  
    // メニューリストを更新
    setMenus(updatedMenus);
  
    // Supabaseでメニューを更新
    const { data, error } = await supabase
      .from('menus') // "menus"テーブル
      .update({ menu: "", recipeurl: "" }) // クリアするデータ
      .eq('id', id); // idで一致するレコードを更新
  };

  const handleEditMenu = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const handleShowClearModal = (menu: Menu) => {
    setMenuToClear(menu);
    setModalVisible(true);
  };

  // ドラッグ用
  const moveMenu = async (draggedIndex: number, hoveredIndex: number) => {
    const newMenus = [...menus];
    const draggedMenu = newMenus[draggedIndex];
    newMenus.splice(draggedIndex, 1);
    newMenus.splice(hoveredIndex, 0, draggedMenu);
  
    // フロントエンドで順番を更新
    setMenus(newMenus);
  
    // 順番をSupabaseに反映させる
    try {
      // 順番が更新された各メニューに対して順番(order)を再設定
      for (let i = 0; i < newMenus.length; i++) {
        const { id } = newMenus[i];
        const { error } = await supabase
          .from('menus')  // "menus"テーブル
          .update({ order: i + 1 })  // orderカラムを更新（1から始まる順番）
          .eq('id', id); // idで一致するメニューを更新
  
        if (error) {
          console.error('Error updating menu order:', error);
          break;
        }
      }
    } catch (error) {
      console.error('Error in moveMenu:', error);
    }
  };

  return (
    <div className="size-full">
      <div className="block">
      <MenuForm onUpdateMenu={updateMenu} selectedMenu={selectedMenu}/>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Menu</th>
            <th>Recipe URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {/* {menus.map((menuItem, index) => (
            <DraggableMenuItem
              key={menuItem.id}
              index={index}
              menu={menuItem}
              moveMenu={moveMenu}
              handleEditMenu={handleEditMenu}
              handleShowClearModal={handleShowClearModal}
            />
          ))}  */}
           {menus.map((menuItem, index) => (
            <tr>
              <td className="text-lg text-info">
                {menuItem.menu || "No Menu"}
              </td>
              <td>
                <a
                  href={menuItem.recipeurl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-secondary"
                >
                  {menuItem.recipeurl || "No Recipe URL"}
                </a>
              </td>
              <td>
                <button
                  className="text-2xl text-primary"
                  onClick={() => handleEditMenu(menuItem)}
                >
                  <BiEditAlt />
                </button>
                <button
                  className="ml-8 text-2xl text-primary"
                  onClick={() => handleShowClearModal(menuItem)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <TrashModal
          onClear={() => {
            if (menuToClear) {
              clearMenu(menuToClear.id);
            }
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

// ドラッグ＆ドロップを適用するメニューアイテムコンポーネント
interface DraggableMenuItemProps {
  index: number;
  menu: Menu;
  moveMenu: (draggedIndex: number, hoveredIndex: number) => void;
  handleEditMenu: (menu: Menu) => void;
  handleShowClearModal: (menu: Menu) => void;
}

const DraggableMenuItem: React.FC<DraggableMenuItemProps> = ({
  index,
  menu,
  moveMenu,
  handleEditMenu,
  handleShowClearModal,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.MENU,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.MENU,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveMenu(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => drag(drop(node))}>
      <td className="text-lg text-info">{menu.menu || "No Menu"}</td>
      <td>
        <a
          href={menu.recipeurl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-secondary"
        >
          {menu.recipeurl || "No Recipe URL"}
        </a>
      </td>
      <td>
        <button className="text-2xl text-primary" onClick={() => handleEditMenu(menu)}>
          <BiEditAlt />
        </button>
        <button className="ml-8 text-2xl text-primary" onClick={() => handleShowClearModal(menu)}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default MenuList;
