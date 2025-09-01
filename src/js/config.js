export const SHOW_HOW_MANY_LATEST_IMGS = 15;

export const SLIDER_SPEED = 20;
export const SLIDER_MAX_STEP = 2;
export const SLIDER_SAFETY_MULITPLIER = 2;

// Werte in % -> siehe scss styling .members
const itemWidthPercent = 25; // Originalbreite der SLiderelemente
const visibleItemCount = 100 / itemWidthPercent; // Anzahl der Items, die im Slider theoretisch sichtbar wären wenn man nur die Orignalbreite beachtet
export const ITEM_TRANSLATEX_SPACING = 80; // Abstand/Spacing zwischen Items in %
const itemWidthAdjusted = (100 - ITEM_TRANSLATEX_SPACING) / visibleItemCount; // Effektive Reduzierung der Breite durch Spacing
export const SLIDER_VISIBLE_ITEMS = 100 / (itemWidthPercent - itemWidthAdjusted); // Anzahl der tatsächlich sichtbaren Items
export const ADJUSTED_ITEM_WIDTH_PERCENT = 100 / SLIDER_VISIBLE_ITEMS;
export const SLIDER_ITEMS_NUM = 10;
