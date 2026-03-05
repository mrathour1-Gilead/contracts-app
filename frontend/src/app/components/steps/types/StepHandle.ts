export interface StepHandle {
  validate: () => boolean;
  data: any;
}