/* eslint-disable @typescript-eslint/no-explicit-any */
import { unflatten } from "flat";
import { create } from "zustand";

export type IStoreSet<Props = Record<string, any>> = (
  keyOrObj: Partial<Props> | keyof Props,
  value?: any,
) => void;

type PropsWithSet<Props = Record<string, any>> = Props & {
  set: IStoreSet<Props>;
};

interface DisplayStore {
  showUpsellSheet: boolean;
}

interface PrdStore {
  text: string;
  setText: (fn: (prev: string) => string) => void;
}

export type IStore = {
  display: PropsWithSet<DisplayStore>;
  prd: PropsWithSet<PrdStore>;
};

export const useStore = create<IStore>((set, get) => {
  function factorySetFunc<ContextObject = IStore>(
    prefixPath: keyof IStore,
    cb?: () => void,
  ) {
    const _set: IStoreSet<Partial<Omit<ContextObject, "set">>> = (
      keyOrObj,
      value,
    ) => {
      const state = get();
      const stateInContext = state[prefixPath];

      let flattenedObject: Record<string, any>;
      const isFirstParamObject =
        (keyOrObj as Record<string, any>)?.constructor?.name === "Object";
      if (isFirstParamObject) {
        flattenedObject = {
          [prefixPath]: {
            ...stateInContext,
            ...(keyOrObj as Record<string, any>),
          },
        };
      } else {
        if (value === undefined) {
          throw new Error(
            `set/${prefixPath}/${
              keyOrObj as string
            }: property name was provided but value is missing. Provide the value to be set.`,
          );
        }
        const keyPath = `${keyOrObj as string}`.replace(/\.+/, ".");
        flattenedObject = {
          [prefixPath]: { ...stateInContext, [keyPath]: value },
        };
      }

      const unflattenedObject = unflatten(flattenedObject);
      set(unflattenedObject as IStore);
      cb?.();
    };

    return _set;
  }

  const store: IStore = {
    display: {
      set: factorySetFunc<IStore["display"]>("display"),
      showUpsellSheet: false,
    },
    prd: {
      set: factorySetFunc<IStore["prd"]>("prd"),
      // for streaming, can access previous data
      setText: (fn: (prev: string) => string) => {
        set((state) => ({
          prd: {
            ...state.prd,
            text: fn(state.prd.text),
          },
        }));
      },
      text: `Hi I am Write My PRD bot, Your PRD writing Assistant 🙌 Tell me what
            does your Product do? And I will try to help you kickstart your PRD
            writing journey. 🚀`,
    },
  };

  return store;
});

// useStore.getState() basically get new reference of cloned state
export const initialStoreState = useStore.getState();

export const resetStoreState = () =>
  useStore.setState({
    ...initialStoreState,
  });
