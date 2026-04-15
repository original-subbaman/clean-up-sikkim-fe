"use client";
import { Sheet, SheetRef } from "react-modal-sheet";
import { useRef } from "react";

function BottomSheet({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const snapPoints = [0, 0.2, 0.5, 0.7, 1]; // Example snap points (25%, 50%, 75% of the screen height)
  const sheetRef = useRef<SheetRef>(null);
  const borderRadius = 20;
  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => sheetRef.current?.snapTo(1)}
      initialSnap={1}
      snapPoints={snapPoints}
      style={{ zIndex: 40 }}
    >
      <Sheet.Container
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        <Sheet.Header
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            height: "10px",
            marginBottom: "20px",
          }}
        />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}

export default BottomSheet;
