//	   _____ _                 __          _____           _       __
//	  / ___/(_)___ ___  ____  / /__       / ___/___  _____(_)___ _/ /
//	  \__ \/ / __ `__ \/ __ \/ / _ \______\__ \/ _ \/ ___/ / __ `/ / 
//	 ___/ / / / / / / / /_/ / /  __/_____/__/ /  __/ /  / / /_/ / /  
//	/____/_/_/ /_/ /_/ .___/_/\___/     /____/\___/_/  /_/\__,_/_/   
//	                /_/

//Simple Serial written by Rubin Huang at NYU|ITP.
//Arduino Demo Code.

void setup() {
  Serial.begin(115200);
  Serial.setTimeout(0);

  //Add following for Uno
  while(!Serial){};
  Serial.println("ready");
}

void loop() {
    
    if(Serial.available() > 0){
      printIntData(); // demo for recive and print int input.//
    }
    
    delay(80);

}

void printIntData(){

      //Create a storage array with dynamic size.//
      const int msgSize = Serial.parseInt();
      int dataIn[msgSize];
      
      //
      for(int i = 0; i < msgSize; i++){
        dataIn[i] = Serial.parseInt();
      }
      
      //print the storage array.//
      for(int i=0; i < sizeof(dataIn)/sizeof(int); i++){
        Serial.print(dataIn[i]);
        Serial.print(' ');
      }
      //Don't for get finish sign!
      //See finish sign in Node.js code.//
      Serial.print('\n');

}

