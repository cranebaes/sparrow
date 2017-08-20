angular.module('sparrowFit')
.controller('WorkoutCtrl', function WorkoutCtrl(httpService, timerService, userDataService, store) {

  this.timer = timerService;
  this.userData = {};
  this.workoutData = '';
  this.workout = '';
  this.user_id = store.get('profile')['user_id'];
  this.url = '/api/get/workout/'+this.user_id;

  this.name = function() {
    console.log('This is the input Name :',this.inputName);
    this.workoutData = userDataService.getWorkout(this.userData, this.inputName);//jogging,a
    this.workout = this.workoutData.template;
    this.timed = this.workoutData.timed;
    if(this.timed===false){
      this.untimed = true;
    } else {
      this.untimed = false;
    }
    console.log('Timed value :', this.timed);
  };

  this.myFunc = function(show) {
    console.log(show);
  }
  this.myFunc2 = function(show2) {
    console.log(show2);
  }

  httpService.getData(this.url, (returnValue) => {
    console.log(1, returnValue)
    this.userData = returnValue[0];
    console.log('This is getting some data:', this.userData);
    // this.workoutData = userDataService.getWorkout(this.userData, this.inputName);//jogging,a
    // this.workout = this.workoutData.template;
    this.myTimedTemplates = this.userData
    .filter((a) => {
      return a.timed;
    })
    .map((a) => {
      console.log('a', a)
      return a.templateName;
    })
    this.myUntimedTemplates = this.userData
    .filter((b) => {
      return b.timed === false;
    })
    .map((b) => {
      return b.templateName;
    })
  });

  this.getTimedTemps = function getTimedTemps() {
    console.log('hi from getTimedTemps');
    this.showTimed = this.myTimedTemplates;


  };

  this.getUntimedTemps = function getUntimedTemps() {
    console.log('hi from getUntimedTemps');
    this.showUntimed = this.myUntimedTemplates;
  };

})

.component('workout', {
  controller: 'WorkoutCtrl',
  templateUrl: 'client/components/workout-component/workout.html'
});
