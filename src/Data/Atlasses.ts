export default class Atlases {
  public static Interface: string = 'interface';
  public static Clouds1: string = 'cloud1.PNG';
  public static Clouds2: string = 'cloud2.PNG';
  public static Clouds3: string = 'cloud3.PNG';
  public static BubbleSprite: string = 'bubble256.png';
  /**
   *  A list of all atlases we need for the preloader.
   */
  public static preloadList: string[] = [
      //Add atlases
  ];

  /**
   * A list of all atlases we need after the preloader.
   */
  public static list: string[] = [
      Atlases.Interface,
       
  ];
}
// export default {
//   environment: {
//     name: "environment",
//     width: 16,
//     height: 16,
//     file: 'assets/images/rogue-environment.png',
//     indices: {
//       floor: {
//         outer: [0x05, 0x05, 0x05, 0x15, 0x07, 0x17]
//       },
//       block: 0x17,
//       walls: {
//         alone: 0x14,
//         intersections: {
//           e_s: 0x00,
//           n_e_s_w: 0x01,
//           e_w: 0x02,
//           s_w: 0x03,
//           n_e_s: 0x10,
//           w: 0x11,
//           e: 0x12,
//           n_s_w: 0x13,
//           n_s: 0x20,
//           s: 0x21,
//           e_s_w: 0x22,
//           n_e: 0x30,
//           n_e_w: 0x31,
//           n: 0x32,
//           n_w: 0x33
//         }
//       }
//     }
//   },

//   player: {
//     name: "player",
//     width: 32,
//     height: 32,
//     file: 'assets/images/rogue-player.png',
//     animations: {
//       idle: {
//         name: "playerIdle",
//         start: 0x01,
//         end: 0x07,
//         frameRate: 6,
//         repeat: true
//       },
//       walk: {
//         name: "playerWalk",
//         start: 0x08,
//         end: 0x0d,
//         frameRate: 10,
//         repeat: true
//       },
//       walkBack: {
//         name: "playerWalkBack",
//         start: 0x10,
//         end: 0x15,
//         frameRate: 10,
//         repeat: true
//       },
//       // Ideally attacks should be five frames at 30fps to
//       // align with the attack duration of 165ms
//       slash: {
//         name: "playerSlash",
//         frames: [0x18, 0x19, 0x19, 0x1a, 0x1b],
//         frameRate: 30,
//         repeat: false
//       },
//       slashUp: {
//         name: "playerSlashUp",
//         frames: [0x21, 0x22, 0x22, 0x23, 0x24],
//         frameRate: 30,
//         repeat: false
//       },
//       slashDown: {
//         name: "playerSlashDown",
//         frames: [0x29, 0x2a, 0x2a, 0x2b, 0x2c],
//         frameRate: 30,
//         repeat: false
//       },
//       hit: {
//         name: "playerHit",
//         start: 0x30,
//         end: 0x34,
//         frameRate: 24,
//         repeat: false
//       },
//       death: {
//         name: "playerDeath",
//         start: 0x38,
//         end: 0x3d,
//         frameRate: 24,
//         repeat: false
//       }
//     }
//   },

//   slime: {
//     name: "slime",
//     width: 32,
//     height: 32,
//     file: 'assets/images/rogue-slime.png',
//     animations: {
//       idle: {
//         name: "slimeIdle",
//         start: 0x01,
//         end: 0x04,
//         frameRate: 6,
//         repeat: true
//       }
//     }
//   },

//   items: {
//     name: "items",
//     width: 16,
//     height: 16,
//     file: 'assets/images/rogue-items.png'
//   },

//   util: {
//     name: "util",
//     width: 16,
//     height: 16,
//     file: 'assets/images/Util.png',
//     indices: {
//       black: 0x00
//     }
//   },
//   ui_joystick_up:{
//     name:"up_joystickpad",
//     width: 16,
//     height: 16,
//     file:'assets/images/transparentLight01.png'
//   },
//   ui_joystick_left:{
//         name:'left_joystickpad',
//         width: 16,
//         height: 16,
//         file:'assets/images/transparentLight03.png'
//       },
//   ui_joystick_down:{
//         name:'down_joystickpad',
//         width: 16,
//         height: 16,
//         file:'assets/images/transparentLight08.png'
//       },
//   ui_joystick_right:{
//         name:'right_joystickpad',
//         width: 16,
//         height: 16,
//         file:'assets/images/transparentLight04.png'
//       },
//   ui_actionButtons_A:{
//         name:'A_action_button',
//         width: 16,
//         height: 16,
//         file:'assets/images/transparentLight34.png'
//       }
// };
