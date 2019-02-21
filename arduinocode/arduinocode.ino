//     _____ _                 __          _____           _       __
//    / ___/(_)___ ___  ____  / /__       / ___/___  _____(_)___ _/ /
//    \__ \/ / __ `__ \/ __ \/ / _ \______\__ \/ _ \/ ___/ / __ `/ / 
//   ___/ / / / / / / / /_/ / /  __/_____/__/ /  __/ /  / / /_/ / /  
//  /____/_/_/ /_/ /_/ .___/_/\___/     /____/\___/_/  /_/\__,_/_/   
//                  /_/

//Simple Serial written by Rubin Huang at NYU|ITP.
//Arduino Demo Code.

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(10);

  //Add following for Uno
  while(!Serial){};
}

void loop() {
  if(Serial.available()>0){

    int dataSize = Serial.parseInt();
    int data[dataSize];

    for(int i=0; i < dataSize; i++){
      data[i] = Serial.parseInt();
    }
    for(int i=0; i < dataSize; i++){
      Serial.print(data[i]);
      Serial.print(" ");
    }
    Serial.print('\n');
  }
  delay(80);
}
