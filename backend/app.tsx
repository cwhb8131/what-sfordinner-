import express from 'express';

const app = express();
app.use(express.json());

// メニューのサンプルデータ
let menus = [
  { id: 1, menu: 'Pizza', recipeurl: 'https://example.com/pizza' },
  { id: 2, menu: 'Pasta', recipeurl: 'https://example.com/pasta' },
  { id: 3, menu: 'Burger', recipeurl: 'https://example.com/burger' },
  { id: 4, menu: 'Sushi', recipeurl: 'https://example.com/sushi' }
];

// PUTリクエスト処理
app.put('/menu/:id', (req, res) => {
  const { id } = req.params;
  const { menu, recipeurl } = req.body;

  const requestId = Number(id);
  const dayMap: { [key: string]: number } = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
  };

  // `day` クエリパラメータが文字列の場合のみ処理する
  let finalId = requestId;
  const day = req.query.day;

  if (typeof day === 'string') {  // `day`が文字列であることを確認
    const dayLower = day.toLowerCase();  // 小文字に変換
    if (dayMap[dayLower]) {
      finalId = dayMap[dayLower];  // 曜日が指定されていた場合、その曜日のIDを使う
    }
  }

  menus = menus.map(item => {
    if (item.id === finalId) {
      return {
        ...item,
        menu: menu || item.menu,
        recipeurl: recipeurl || item.recipeurl
      };
    }
    return item;
  });

  res.json({
    message: `Menu with id ${finalId} updated successfully.`,
    menus
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
