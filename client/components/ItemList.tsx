import React, { useState } from "react";
import styles from "./Styles.module.css";

interface ItemListProps {
  items: string[];
  onSelect: (selectedItem: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onSelect }) => {
  const [userChoice, setUserChoice] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setUserChoice(item);
    onSelect(item);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(item)}>
          <div
            onClick={() => handleItemClick(item)}
            className={styles.phaseBtn}
          >
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
