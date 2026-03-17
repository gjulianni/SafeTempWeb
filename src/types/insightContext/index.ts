type GeneralContext = {
  mode: 'general';
  text: string; 
};

type ExperimentContext = {
  mode: 'experiment';
  text: string;
  culture: string;
  stage: string;
  thresholds: {
    min: number;
    max: number;
    criticalMax: number;
  };
  equipment: string[];
};

export type GreenhouseContext = GeneralContext | ExperimentContext;