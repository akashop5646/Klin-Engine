/**
 * Button Component — the canonical Klin UI component.
 * Consumes semantic theme tokens via CSS variables. No hardcoded colors.
 * Every future UI component follows this pattern.
 */

import React, { useState, useCallback, useRef } from "react";
import type { ButtonProps } from "../config/defaults";
import { buttonDefaults } from "../config/defaults";
import { getButtonStyles, getButtonHoverStyles, getButtonActiveStyles, getButtonFocusStyles } from "../styles/styles";
import { getAriaAttributes } from "../runtime/accessibility";
import { getAnimationStyle } from "../runtime/animations";

export const Button: React.FC<Partial<ButtonProps>> = (incomingProps) => {
  const props: ButtonProps = { ...buttonDefaults, ...incomingProps };
  const {
    text,
    variant,
    size,
    shape,
    icon,
    iconPosition,
    loading,
    disabled,
    fullWidth,
    borderRadiusOverride,
    animation,
    linkUrl,
    target,
    type,
    onClick,
    ariaLabel,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const isDisabled = disabled || loading;

  // Base styles from semantic tokens
  const baseStyles = getButtonStyles(variant, size, shape, fullWidth, isDisabled, borderRadiusOverride);

  // Merge interactive state styles
  let computedStyle: Record<string, string> = { ...baseStyles };
  if (!isDisabled) {
    if (isPressed) {
      computedStyle = { ...computedStyle, ...getButtonActiveStyles(variant) };
    } else if (isHovered) {
      computedStyle = { ...computedStyle, ...getButtonHoverStyles(variant) };
    }
    if (isFocused) {
      computedStyle = { ...computedStyle, ...getButtonFocusStyles(variant) };
    }
  }

  // Animation
  const animStyle = getAnimationStyle(animation, isHovered, isPressed);
  computedStyle = { ...computedStyle, ...animStyle };

  // ARIA attributes
  const aria = getAriaAttributes(isDisabled, loading, ariaLabel, text);

  // Event handlers
  const handleMouseEnter = useCallback(() => { if (!isDisabled) setIsHovered(true); }, [isDisabled]);
  const handleMouseLeave = useCallback(() => { setIsHovered(false); setIsPressed(false); }, []);
  const handleMouseDown = useCallback(() => { if (!isDisabled) setIsPressed(true); }, [isDisabled]);
  const handleMouseUp = useCallback(() => { setIsPressed(false); }, []);
  const handleFocus = useCallback(() => { setIsFocused(true); }, []);
  const handleBlur = useCallback(() => { setIsFocused(false); }, []);
  const handleClick = useCallback(() => {
    if (!isDisabled && onClick) onClick();
  }, [isDisabled, onClick]);
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isDisabled && onClick) onClick();
    }
  }, [isDisabled, onClick]);

  // Content
  const iconElement = icon ? <span className="klin-button-icon" aria-hidden="true">{icon}</span> : null;
  const loadingSpinner = loading ? (
    <span className="klin-button-spinner" aria-hidden="true" style={{ display: "inline-block", width: "1em", height: "1em", border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "klin-spin 600ms linear infinite" }} />
  ) : null;

  const content = (
    <>
      {loading && loadingSpinner}
      {!loading && iconPosition === "left" && iconElement}
      <span className="klin-button-text">{text}</span>
      {!loading && iconPosition === "right" && iconElement}
    </>
  );

  // Render as anchor when linkUrl is provided
  if (linkUrl && !isDisabled) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={linkUrl}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        style={computedStyle}
        className="klin-button"
        data-variant={variant}
        data-size={size}
        data-shape={shape}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...aria}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      style={computedStyle}
      className="klin-button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-loading={loading ? "true" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...aria}
    >
      {content}
    </button>
  );
};
