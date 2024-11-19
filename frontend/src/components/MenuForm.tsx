import React, { useState, useEffect } from 'react';

// プロパティの型定義
interface MenuFormProps {
  onUpdateMenu: (id: number, menu: string, recipeurl: string) => void; // 更新用関数
  selectedMenu: { id: number; menu: string; recipeurl: string } | null; // 編集するメニュー
}

const MenuForm: React.FC<MenuFormProps> = ({ onUpdateMenu, selectedMenu }) => {
  const [menu, setMenu] = useState<string>(''); // メニュー名
  const [recipeUrl, setRecipeUrl] = useState<string>(''); // レシピURL

  // selectedMenuが更新された時にフォームを初期化
  useEffect(() => {
    if (selectedMenu) {
      setMenu(selectedMenu.menu);
      setRecipeUrl(selectedMenu.recipeurl);
    }
  }, [selectedMenu]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (selectedMenu) {
      // 編集されたメニューを更新
      onUpdateMenu(selectedMenu.id, menu, recipeUrl);
    }

    // フォームの入力フィールドをリセット
    setMenu('');
    setRecipeUrl('');
  };

  return (
    <div className='space-x-4'>
      <h3 className='mt-5 input-primary'>{selectedMenu ? 'Update Menu' : 'Add New Menu'}</h3>
      <form onSubmit={handleSubmit} className='flex'>
        <input
          type="text"
          placeholder="Enter menu name"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          className='input input-bordered input-primary w-full max-w-xs'
        />
        <input
          type="text"
          placeholder="Enter recipe URL"
          value={recipeUrl}
          onChange={(e) => setRecipeUrl(e.target.value)}
          className='input input-bordered input-primary w-full max-w-xs ml-2'
        />
        <button type="submit" className='btn btn-active btn-primary ml-2'>{selectedMenu ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default MenuForm;
