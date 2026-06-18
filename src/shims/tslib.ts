type AnyRecord = Record<PropertyKey, unknown>;

export function __assign<T extends AnyRecord>(
  target: T,
  ...sources: Array<Partial<AnyRecord> | null | undefined>
) {
  for (const source of sources) {
    if (source == null) continue;
    for (const key of Object.keys(Object(source))) {
      target[key] = source[key];
    }
  }
  return target;
}

export function __rest(source: AnyRecord | null | undefined, exclude: string[]) {
  const target: AnyRecord = {};
  if (source == null) return target;

  for (const key of Object.keys(source)) {
    if (exclude.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      if (exclude.indexOf(symbol as unknown as string) >= 0) continue;
      if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
        target[symbol as unknown as string] = source[symbol as keyof AnyRecord];
      }
    }
  }

  return target;
}

type GeneratorLike = {
  next: (value?: unknown) => IteratorResult<unknown>;
  throw: (value?: unknown) => IteratorResult<unknown>;
};

type GeneratorFactory = {
  apply: (thisArg: unknown, args: unknown[]) => GeneratorLike;
};

export function __awaiter(
  thisArg: unknown,
  _arguments: unknown,
  P: PromiseConstructor,
  generator: GeneratorFactory,
) {
  function adopt(value: unknown) {
    return value instanceof P ? value : new P((resolve) => resolve(value));
  }

  return new (P || Promise)((resolve, reject) => {
    function fulfilled(value: unknown) {
      try {
        step(generator.next(value));
      } catch (error: unknown) {
        reject(error);
      }
    }

    function rejected(value: unknown) {
      try {
        step(generator.throw(value));
      } catch (error: unknown) {
        reject(error);
      }
    }

    function step(result: IteratorResult<unknown>) {
      if (result.done) {
        resolve(result.value);
        return;
      }
      adopt(result.value).then(fulfilled, rejected);
    }

    const iterator = generator.apply(thisArg, (_arguments as unknown[]) || []);
    step(iterator.next());
  });
}

export function __spreadArray<T>(to: T[], from: T[], pack?: boolean) {
  if (pack || arguments.length === 2) {
    for (let i = 0, l = from.length; i < l; i++) {
      to.push(from[i]);
    }
  } else {
    for (let i = 0, l = from.length; i < l; i++) {
      to.push(from[i]);
    }
  }

  return to;
}
