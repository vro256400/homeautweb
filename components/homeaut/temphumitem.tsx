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
  caption : boolean;
}

function TempHumItem({value_name, config, caption}: TempHumItemProps)
{
  const renderComponent = () =>
    {
      return <div>
         {config.get(value_name)?.values[0]}
            <br/>
            {config.get(value_name)?.values[1]}
      </div>;
    }
    return (
      <div id="{changeCounter}">
              {caption ? (<Card className="w-full max-w-sm">
              <CardHeader>
                  <CardTitle>{value_name}</CardTitle>
              </CardHeader> 
              <CardContent>
                  {renderComponent()} 
              </CardContent>
            </Card>) : 
            (<div>{renderComponent()}</div>)
            }
            
            <br/>
            </div>
    );
}


export default TempHumItem;