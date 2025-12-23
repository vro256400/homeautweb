import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import UnivValue from "@/components/homeaut/univconfigval"

interface TempHumItemProps {
  value_name : string;
  config: Map<string, UnivValue>;
}

function TempHumItem({value_name, config}: TempHumItemProps)
{
    return (
      <div id="{changeCounter}">
      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>{value_name}</CardTitle>
        </CardHeader> 
        <CardContent>
            {config.get(value_name)?.values[0]}
            <br/>
            {config.get(value_name)?.values[1]}
        </CardContent>
      </Card>
      <br/>
      </div>
    );
}


export default TempHumItem;