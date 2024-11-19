import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // モーダルを開く
  const openModal = () => {
    setIsOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Helpbtn */}
      <button className="btn" onClick={openModal}>
      <FaRegQuestionCircle className="size-8"/>
      </button>

      {/* モーダル */}
      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">How to use</h3>
            <p className="py-4">
              1.メニューを入力したい曜日に編集アイコンをクリックしてください　<br />
              2.メニューとレシピのURLの入力欄にそれぞれ入力したらUpdateボタンをクリックしてください<br />
              3.入力済の内容をクリアしたい場合はゴミ箱アイコンをクリックしてください
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* 閉じるボタン */}
                <button type="button" className="btn" onClick={closeModal}>OK</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HelpModal;
