import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TSelectType = {
  setGraphType: (value: string) => void;
  graphType?: string;
};

const SelectTipo = ({ setGraphType, graphType = 'pizza' }: TSelectType) => {
  return (
    <Select value={graphType} onValueChange={setGraphType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Grafico" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="coluna">Gráficos de coluna</SelectItem>
        <SelectItem value="pizza">Gráficos em pizza</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTipo;
