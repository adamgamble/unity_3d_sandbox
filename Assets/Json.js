var next_update;
var jenkins_data;

function Start () {
  next_update = 5;
  load_jenkins_data();
}

function Update () {
  for(var i=0;i<jenkins_data["jobs"].length;i++) {
    if (jenkins_data["jobs"][i]["color"] == "blue_anime" || jenkins_data["jobs"][i]["color"] == "red_anime" || jenkins_data["jobs"][i]["color"] == "aborted_anime") {
      cube = GameObject.Find(jenkins_data["jobs"][i]["name"]);
      cube.transform.Rotate(60*Time.deltaTime, 0, 0);
    }
  }

  if (Time.time > next_update) {
    next_update = Time.time + 5;
    Debug.Log("Refreshing Data");
    load_jenkins_data();
  }
}

function load_jenkins_data() {
  var url = "http://isotope11.selfip.com:8080/api/json";
  var www : WWW = new WWW (url);
  yield www;
  jenkins_data = eval(www.text);
  handle_jenkins_data();
}

function handle_jenkins_data() {
  default_x_value = -13;
  default_y_value = 6;
  current_x_value = default_x_value;
  current_y_value = default_y_value;
  x_spacing_between_cubes = 8;
  y_spacing_between_cubes = -2;
  for(var i=0;i<jenkins_data["jobs"].length;i++) {
    var cube = GameObject.Find(jenkins_data["jobs"][i]["name"]);
    if (!cube) {
      cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
    }
    cube.name = jenkins_data["jobs"][i]["name"];
    cube.transform.localScale = Vector3(7,1,1);
    //var go : GameObject = new GameObject("MyText");
    //var tm : GUIText = go.AddComponent("GUIText");
    //tm.text = jenkins_data["jobs"][i]["name"];
    if (jenkins_data["jobs"][i]["color"] == "blue" || jenkins_data["jobs"][i]["color"] == "blue_anime") {
      cube.renderer.material = GameObject.Find("GreenCube").renderer.material;
    } else {
      cube.renderer.material = GameObject.Find("RedCube").renderer.material;
    }
    if (current_x_value < 14) {
      cube.transform.position = Vector3(current_x_value, current_y_value, 0);
      //tm.transform.position = Vector3(current_x_value - 2.5,current_y_value, 10);
      current_x_value = current_x_value + x_spacing_between_cubes;
    } else {
      current_x_value = default_x_value;
      current_y_value = current_y_value + y_spacing_between_cubes;
      cube.transform.position = Vector3(current_x_value, current_y_value, 0);
      //tm.transform.position = Vector3(current_x_value - 2.5,current_y_value, 0);
      current_x_value = current_x_value + x_spacing_between_cubes;
    }
  }
}
