import { supabase } from './supabase';

export const getMenu = async () => {
    const { data, error } = await supabase
      .from('menu')  // テーブル名
      .select('*');  // すべてのカラムを取得
  
    if (error) {
      console.error('Error fetching menu:', error);
      return;  // エラーがあった場合は処理を終了
    }
  
    console.log('Menu data:', data);
    return data;  // 取得したデータを返す
  };



export const updateMenu = async (id: number, newMenu: string) => {
    const { data, error } = await supabase
      .from('menu')  // テーブル名
      .update({ menu: newMenu })  // 更新するフィールドと値
      .eq('id', id);  // idが一致する行を更新
  
    if (error) {
      console.error('Error updating menu:', error);
      return;
    }
  
    console.log('Updated menu:', data);
  };
      
export const clearMenu = async (id: number) => {
    const { data, error } = await supabase
      .from('menu')  // テーブル名
      .update({ menu: null, recipeurl: null })  // `menu` と `recipeurl` カラムを `NULL` に設定
      .eq('id', id);  // `id` が一致する行を更新
  
    if (error) {
      console.error('Error clearing menu:', error);
      return;
    }
  
    console.log('Updated menu:', data);
  };
  