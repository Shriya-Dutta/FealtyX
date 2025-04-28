import React from "react";

const Button = (props) => {
    return (
        <button
            id={props.id}
            className={props.className}
            type={props.type || "button"}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.icon && (
                <img
                    src={props.icon}
                    alt="icon"
                    style={props.iconStyle}
                />
            )}
            {props.value}
        </button>
    );
};

export default Button;