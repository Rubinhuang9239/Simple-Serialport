int flameValue = 0;
void setup() {
  Serial.begin(9600);
}
void loop() {
    int val = round( random(0,100) );
    Serial.println(val);
    delay(100);

}
