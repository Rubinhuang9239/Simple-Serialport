int flameValue = 0;
void setup() {
  pinMode(A5, INPUT);    // set the switch pin to be an input
  pinMode(13, OUTPUT);   // set the yellow LED pin to be an output
  pinMode(12, OUTPUT);   // set the red LED pin to be an output
  Serial.begin(9600);
}
void loop() {
  flameValue = analogRead(A5);
  if (flameValue > 500) {

    Serial.println(flameValue);
    // if there is no flame, green light lights up
    digitalWrite(13, HIGH);    // turn on the yellow LED
    digitalWrite(12, LOW);     // turn off the red LED
  }
  
  else {
    // if there is flame, red light lights up and buzzer buzz
    digitalWrite(13, LOW);     // turn off the yellow LED
    digitalWrite(12, HIGH);    // turn on the red LED
  }
  delay(1000);
}
