import { supabase } from './supabase';

interface Menu {
  id: number;
  menu: string;
  recipeurl: string;
}

export const getMenu = async (): Promise<Menu[]> => {
  const { data, error } = await supabase
    .from('menus')
    .select('*');

  if (error) {
    console.error('Error fetching menu:', error);
    return [];
  }

  return data || [];
};

export const updateMenu = async (id: number, newMenu: string): Promise<Menu | null> => {
  const { data, error } = await supabase
    .from('menus')
    .update({ menu: newMenu })
    .eq('id', id);

  if (error) {
    console.error('Error updating menu:', error);
    throw error;
  }

  return data ? data[0] : null;
};

export const clearMenu = async (id: number): Promise<Menu | null> => {
  const { data, error } = await supabase
    .from('menus')
    .update({ menu: null, recipeurl: null })
    .eq('id', id);

  if (error) {
    console.error('Error clearing menu:', error);
    throw error;
  }

  return data ? data[0] : null;
};
