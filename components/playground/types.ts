export type HandGrip = "right" | "left" | "both";
export type TargetSize = "40px" | "44px" | "48px";
export type ThumbZone = "natural" | "stretch" | "hard";
export type ScreenScenario = "feed" | "form" | "actions";
export interface TouchEventData {
  x: number;
  y: number;
  zone: ThumbZone;
  elementClicked: string;
}

export interface SimulatorSettings {
  handGrip: HandGrip;
  showOverlay: boolean;
  targetSize: TargetSize;
  activeScreen: ScreenScenario;
}
