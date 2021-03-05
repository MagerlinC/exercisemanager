import React, { useState } from "react";
import "./dropdown.scss";
import Scrollbars from "react-custom-scrollbars";

function Dropdown({
  dropdownItems,
  selectedItem,
  onSelect,
  closedText,
  locked,
}) {
  let container;

  const [isOpen, setOpen] = useState(false);

  const closeOnBlur = (e) => {
    const newTarget = e.relatedTarget;
    if (
      (newTarget && newTarget.id === "dropdown-search-input") ||
      (container && container.contains(newTarget))
    ) {
      return;
    }
    setOpen(false);
  };

  const doSelectItem = (item, e) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect(item);
    setOpen(false);
  };

  return (
    <div
      tabIndex="0"
      onBlur={(e) => closeOnBlur(e)}
      onClick={() => (locked ? void 0 : setOpen(true))}
      className={"dropdown-container" + (locked ? " locked" : "")}
      ref={(div) => (container = div)}
    >
      <div className={"dropdown-closed"}>
        {selectedItem ? (
          selectedItem
        ) : (
          <span className={"closed-text"}>{closedText}</span>
        )}
      </div>
      {isOpen ? (
        <div className={"dropdown-inner"}>
          <Scrollbars
            style={{
              width: 250,
              height: Math.min(600, 40 * Math.max(dropdownItems.length, 1)),
            }}
          >
            <div className={"dropdown-contents"}>
              {dropdownItems.map((item) => (
                <div
                  onClick={(e) => doSelectItem(item, e)}
                  key={"dropdown-item-" + item}
                  className={"dropdown-item"}
                >
                  <div className={"item-text"}>{item}</div>
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      ) : null}
    </div>
  );
}
export default Dropdown;
