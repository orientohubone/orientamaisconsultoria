export function __assign(target: any, ...sources: any[]) {
  for (const source of sources) {
    if (source == null) continue;
    for (const key of Object.keys(Object(source))) {
      (target as any)[key] = (source as any)[key];
    }
  }
  return target;
}

export function __rest(source: any, exclude: string[]) {
  const target: Record<string, any> = {};
  if (source == null) return target;

  for (const key of Object.keys(source)) {
    if (exclude.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      if (exclude.indexOf(symbol as unknown as string) >= 0) continue;
      if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
        target[symbol as unknown as string] = source[symbol];
      }
    }
  }

  return target;
}

export function __awaiter(thisArg: any, _arguments: any, P: any, generator: any) {
  function adopt(value: any) {
    return value instanceof P ? value : new P((resolve: any) => resolve(value));
  }

  return new (P || Promise)((resolve: any, reject: any) => {
    function fulfilled(value: any) {
      try {
        step(generator.next(value));
      } catch (error) {
        reject(error);
      }
    }

    function rejected(value: any) {
      try {
        step(generator.throw(value));
      } catch (error) {
        reject(error);
      }
    }

    function step(result: any) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

