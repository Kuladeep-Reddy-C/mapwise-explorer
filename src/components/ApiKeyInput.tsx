
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getApiKey, saveApiKey, validateApiKey } from '@/lib/mapHelpers';
import { toast } from "@/components/ui/use-toast";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(true);

  // Check for existing API key on component mount
  useEffect(() => {
    const storedApiKey = getApiKey();
    if (storedApiKey) {
      setApiKey(storedApiKey);
      onApiKeyChange(storedApiKey);
      setShowInput(false);
    }
  }, [onApiKeyChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);

    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        saveApiKey(apiKey);
        onApiKeyChange(apiKey);
        setShowInput(false);
        
        toast({
          title: "Success",
          description: "Google Maps API key saved successfully",
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key you entered is invalid. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      toast({
        title: "Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('google_maps_api_key');
    setApiKey('');
    setShowInput(true);
    onApiKeyChange('');
    
    toast({
      title: "API Key Removed",
      description: "You can now enter a new API key.",
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 animate-fade-in">
      {showInput ? (
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-medium mb-4">Enter Google Maps API Key</h2>
          <p className="text-sm text-muted-foreground mb-4">
            To use this application, you need to provide a valid Google Maps API key with Maps JavaScript API enabled.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Your Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white/70 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored only in your browser's local storage and is not sent to our servers.
              </p>
            </div>
            
            <Button 
              type="submit" 
              disabled={isValidating || !apiKey.trim()} 
              className="w-full transition-all duration-300 ease-in-out"
            >
              {isValidating ? "Validating..." : "Save API Key"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 glass-effect rounded-lg">
          <div>
            <p className="text-sm font-medium">Using saved API key</p>
            <p className="text-xs text-muted-foreground">Key ending with: ...{apiKey.slice(-6)}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset} 
            className="transition-all duration-300 hover:bg-destructive/10"
          >
            Change Key
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
