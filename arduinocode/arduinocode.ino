void setup() {
  Serial.begin(9600);
}

void loop() {
    
    int val = round( random(0,100) );
    
    if(Serial.available() > 0)    
      
      Serial.println(val);
    
    }
    
    delay(100);

}
