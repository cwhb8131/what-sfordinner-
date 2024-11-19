import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import MenuForm from "./MenuForm";
import TrashModal from "./TrashModal";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // ドラッグアイテムタイプを定義
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const API_URL = "http://localhost:3000/menu/";

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
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Menu[]) => {
        setMenus(data); // メニューリストを更新
      });
  };

  const updateMenu = (id: number, menu: string, recipeurl: string) => {
    const json = {
      menu,
      recipeurl,
    };

    fetch(`${API_URL}${id}`, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchMenu(); // メニューを再取得してリストを更新
    });
  };

  const clearMenu = (id: number) => {
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

    setMenus(updatedMenus);

    const json = {
      menu: "",
      recipeurl: "",
    };

    fetch(`${API_URL}${id}`, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleEditMenu = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const handleShowClearModal = (menu: Menu) => {
    setMenuToClear(menu);
    setModalVisible(true);
  };

  // ドラッグ用
  const moveMenu = (draggedIndex: number, hoveredIndex: number) => {
    const newMenus = [...menus];
    const draggedMenu = newMenus[draggedIndex];
    newMenus.splice(draggedIndex, 1);
    newMenus.splice(hoveredIndex, 0, draggedMenu);
    setMenus(newMenus);
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
          {menus.map((menuItem, index) => (
            <DraggableMenuItem
              key={menuItem.id}
              index={index}
              menu={menuItem}
              moveMenu={moveMenu}
              handleEditMenu={handleEditMenu}
              handleShowClearModal={handleShowClearModal}
            />
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
