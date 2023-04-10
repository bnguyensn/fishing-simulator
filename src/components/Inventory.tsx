import { Popup } from './Popup';
import { Button } from './Button';
import { InventoryItem, useAppStore } from '../store/store';
import { itemsDb } from '../data/items';

export interface InventoryProps {
  isOpen: boolean;
  close: () => void;
}

export interface InventoryItemProps {
  item: InventoryItem;
}

function InventoryItemComponent({
  item: { itemId, obtainedTimestamp },
}: InventoryItemProps) {
  const { id, icon, name, description } = itemsDb[itemId];
  return <img src={icon} alt={name} className="w-full h-full object-cover" />;
}

export function Inventory({ isOpen, close }: InventoryProps) {
  const inventoryCapacity = useAppStore(
    (state) => state.player.inventoryCapacity
  );
  const inventory = useAppStore((state) => state.inventory);

  const inventorySlots = new Array(inventoryCapacity)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="w-12 h-12 border bg-gray-200">
        {inventory[`${index}`] ? (
          <InventoryItemComponent item={inventory[`${index}`]} />
        ) : null}
      </div>
    ));

  return (
    <Popup title="Inventory" isOpen={isOpen}>
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-row-reverse gap-2">
          <Button
            text="Close"
            variant="outlined"
            onClick={() => {
              close();
            }}
          />
        </div>

        <div className="grid gap-2 grid-cols-5 justify-center justify-items-center">
          {inventorySlots}
        </div>
      </div>
    </Popup>
  );
}
