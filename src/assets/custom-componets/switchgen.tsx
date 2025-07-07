import React from "react";
import { Label } from "../../../@/components/ui/label";
import { Switch } from "../../../@/components/ui/switch";

interface Props {
  name: string;
}

const Switchgen: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={name} />
      <Label htmlFor={name}>{name}</Label>
    </div>
  );
};
export default Switchgen;
