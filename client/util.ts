export const enumStrings = <K extends string>(keys: K[]): K[] => {
  return keys.filter((key) => !key.match(/^[0-9]+$/));
};

export const randomArrayItem = <T extends unknown>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const sum = (numbers: number[]): number =>
  numbers.reduce((total, aNumber) => total + aNumber, 0);

export const average = (numbers: number[]): number =>
  sum(numbers) / numbers.length;

export const timeFormat = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const remainingTime = time % 3600;
  let minutes: number | string = Math.floor(remainingTime / 60);
  let seconds: number | string = Math.floor(remainingTime % 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

export const between = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

export const volumeFormat = (
  volume: number,
  muted: boolean
): "volume-slash" | "volume-off" | "volume-down" | "volume" | "volume-up" => {
  if (muted) {
    return "volume-slash";
  }
  if (volume <= 0) {
    return "volume-off";
  }
  if (volume > 0 && volume <= 33) {
    return "volume-down";
  }
  if (volume > 33 && volume <= 66) {
    return "volume";
  }
  return "volume-up";
};

export const thumbFormat = (frame: number): string => {
  if (frame < 10) {
    return `thumb-00${frame}.jpg`;
  }
  if (frame < 100) {
    return `thumb-0${frame}.jpg`;
  }
  return `thumb-${frame}.jpg`;
};
