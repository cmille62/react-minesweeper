import * as React from "react";
import { useRootStore } from "../stores";
import { BoardPayload, FieldType } from "../types";
import { actions as ACTIONS } from "./actions";

interface WithTypeProps {
  uid: string;
}

export const withType =
  <P extends Record<string, unknown>>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & any> =>
  ({ uid, ...props }: WithTypeProps) => {
    const { gameStore } = useRootStore();
    const [config, setConfig] = React.useState<FieldType>();

    React.useEffect(() => {
      const handleChange = (state: FieldType) => {
        setConfig(state);
      };
      if (!uid) {
        throw new Error("No UID!");
      }
      const sub = gameStore.state
        .getStore(uid)
        .subscribe({ next: handleChange });
      return () => {
        sub.unsubscribe();
      };
    }, [uid, config]);

    const handleChange = (configuration: FieldType) => {
      const payload: BoardPayload = { [uid]: configuration };
      gameStore.events.next({ type: ACTIONS.SET_FIELD, payload });
    };

    const show = () => {
      if (config) {
        const payload: BoardPayload = { [uid]: config };
        gameStore.events.next({ type: ACTIONS.SHOW_FIELD, payload });
      }
    };

    const actions = {
      handleChange,
      show,
    };

    return (
      <WrappedComponent
        {...(props as P)}
        state={gameStore.state}
        {...{ uid, actions }}
        {...config}
      />
    );
  };
