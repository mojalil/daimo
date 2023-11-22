import Octicons from "@expo/vector-icons/Octicons";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Spacer from "./Spacer";
import { color } from "./style";
import { TextBody } from "./text";
import { useNetworkState } from "../../sync/networkState";

export function OfflineHeader({
  shouldAddPaddingWhenOnline = true,
  shouldRemovePaddingWhenOffline = false,
}: {
  shouldAddPaddingWhenOnline?: boolean;
  shouldRemovePaddingWhenOffline?: boolean;
}) {
  const netState = useNetworkState();
  const isOffline = netState.status === "offline";

  const ins = useSafeAreaInsets();
  const top = Math.max(ins.top, 16);
  const style = {
    backgroundColor: isOffline ? color.warningLight : color.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: isOffline || shouldAddPaddingWhenOnline ? top : 0,
    marginHorizontal: -16,
    marginBottom: isOffline && shouldRemovePaddingWhenOffline ? -top : 0,
  } as const;

  const isAndroid = Platform.OS === "android";

  return (
    <View style={style}>
      {
        isOffline && isAndroid && (
          <Spacer h={16} />
        ) /* Some Androids have a camera excluded from the safe insets. */
      }
      {isOffline && (
        <TextBody color={color.midnight}>
          <Octicons name="alert" size={14} />
          <Spacer w={8} />
          Offline
        </TextBody>
      )}
      {isOffline && <Spacer h={8} />}
    </View>
  );
}
