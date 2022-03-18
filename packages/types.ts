import Html2React from "@frontity/html2react/types";
import { Frontity, MergePackages } from "frontity/types";
import Router from "@frontity/router/types";
import Source from "@frontity/source/types";
import HeadlessHorsemanThemeTypescript from "@whale-agency/headless-horseman-theme-typescript/types/index";

/**
 * Packages required by `TextgainThemeTypeScript`.
 */
type Packages = MergePackages<
  Frontity,
  Router,
  Source,
  Html2React,
  HeadlessHorsemanThemeTypescript
>;

export default Packages;
