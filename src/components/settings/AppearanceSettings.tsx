
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon, Type, Palette } from "lucide-react";

export const AppearanceSettings = () => {
  const { theme, fontSize, accentColor, toggleTheme, setFontSize, setAccentColor } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the platform looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme" className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>Theme</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span>Typography</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Colors</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="mt-4">
            <div className="space-y-2">
              <Label>Mode</Label>
              <RadioGroup 
                value={theme} 
                onValueChange={(value) => {
                  if (value !== theme) toggleTheme();
                }}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                <div>
                  <RadioGroupItem 
                    value="light" 
                    id="theme-light" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    <span>Light</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="dark" 
                    id="theme-dark" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    <span>Dark</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="mt-4">
            <div className="space-y-2">
              <Label>Font Size</Label>
              <RadioGroup 
                value={fontSize} 
                onValueChange={(value) => setFontSize(value as any)}
                className="grid grid-cols-3 gap-4 pt-2"
              >
                <div>
                  <RadioGroupItem 
                    value="small" 
                    id="font-small" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="font-small"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-sm">Aa</span>
                    <span className="mt-2">Small</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="medium" 
                    id="font-medium" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="font-medium"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-base">Aa</span>
                    <span className="mt-2">Medium</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="large" 
                    id="font-large" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="font-large"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-lg">Aa</span>
                    <span className="mt-2">Large</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="mt-4">
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <RadioGroup 
                value={accentColor} 
                onValueChange={(value) => setAccentColor(value as any)}
                className="grid grid-cols-5 gap-4 pt-2"
              >
                <div>
                  <RadioGroupItem 
                    value="blue" 
                    id="color-blue" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="color-blue"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#5C7AEA]" />
                    <span className="mt-2">Blue</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="green" 
                    id="color-green" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="color-green"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#4CAF50]" />
                    <span className="mt-2">Green</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="purple" 
                    id="color-purple" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="color-purple"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#9C27B0]" />
                    <span className="mt-2">Purple</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="orange" 
                    id="color-orange" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="color-orange"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#FF9800]" />
                    <span className="mt-2">Orange</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="pink" 
                    id="color-pink" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="color-pink"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#E91E63]" />
                    <span className="mt-2">Pink</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
