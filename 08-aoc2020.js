/*
* --- Day 8: Handheld Halting ---

Your flight to the major airline hub reaches cruising altitude without incident. While you consider checking the in-flight menu for one of those drinks that come with a little umbrella, you are interrupted by the kid sitting next to you.

Their handheld game console won't turn on! They ask if you can take a look.

You narrow the problem down to a strange infinite loop in the boot code (your puzzle input) of the device. You should be able to fix it, but first you need to be able to run the code in isolation.

The boot code is represented as a text file with one instruction per line of text. Each instruction consists of an operation (acc, jmp, or nop) and an argument (a signed number like +4 or -20).

    acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
    jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
    nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.

For example, consider the following program:

nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6

These instructions are visited in this order:

nop +0  | 1
acc +1  | 2, 8(!)
jmp +4  | 3
acc +3  | 6
jmp -3  | 7
acc -99 |
acc +1  | 4
jmp -4  | 5
acc +6  |

First, the nop +0 does nothing. Then, the accumulator is increased from 0 to 1 (acc +1) and jmp +4 sets the next instruction to the other acc +1 near the bottom. After it increases the accumulator from 1 to 2, jmp -4 executes, setting the next instruction to the only acc +3. It sets the accumulator to 5, and jmp -3 causes the program to continue back at the first acc +1.

This is an infinite loop: with this sequence of jumps, the program will run forever. The moment the program tries to run any instruction a second time, you know it will never terminate.

Immediately before the program would run an instruction a second time, the value in the accumulator is 5.

Run your copy of the boot code. Immediately before any instruction is executed a second time, what value is in the accumulator?
*/
const mappedBoot = getBoot().map((instruction) => {
  let [action, signedValue] = instruction.split(' ')

  return {
    action,
    value: parseInt(signedValue, 10),
  }
})

const solvePart1 = () => {
  return run(mappedBoot);
}

function run(instructions, mustComplete = false) {
  let total = 0;
  let pointers = new Set();
  let pointer = 0;

  while(instructions[pointer] && !pointers.has(pointer) ) {
    pointers.add(pointer);

    switch (instructions[pointer].action) {
      case 'acc':
        total += instructions[pointer].value;
        ++pointer;
        break;
      case 'jmp':
        pointer += instructions[pointer].value;
        break;
      case 'nop':
        ++pointer;
        break;
    }
  }

  return mustComplete ? pointer === instructions.length && total : total
}

let answer = solvePart1(mappedBoot)
console.log('Answer part 1: ', answer)

/*
* --- Part Two ---

After some careful analysis, you believe that exactly one instruction is corrupted.

Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

For example, consider the same program from above:

nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6

If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

nop +0  | 1
acc +1  | 2
jmp +4  | 3
acc +3  |
jmp -3  |
acc -99 |
acc +1  | 4
nop -4  | 5
acc +6  | 6

After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?
*/

const solvePart2 = (instructions) => {
  let total;
  let i = 0;

  while (!total) {
    if (instructions[i].action === 'jmp') {
      instructions[i].action = 'nop';
      total = run(instructions, true)
      instructions[i].action = 'jmp'
    } else if (instructions[i].action === 'nop') {
      instructions[i].action = 'jmp';
      total = run(instructions, true);
      instructions[i].action = 'nop';
    }
    i++;
  }

  return total
}

let answer2 = solvePart2(mappedBoot)
console.log('answer2', answer2)

function getBoot() {
  return (
`acc +9
acc -2
acc -12
acc +33
jmp +301
nop +508
jmp +216
acc +27
acc +35
acc +43
acc +31
jmp +309
acc +18
acc -19
acc +7
jmp +44
acc -13
acc -17
acc +31
jmp +311
nop +612
jmp +143
acc +22
nop +85
jmp +458
acc -3
jmp +13
acc -19
acc +27
acc +12
jmp +483
acc +40
acc +6
jmp +128
jmp +10
acc +0
acc -3
acc -2
jmp -11
acc +43
acc -12
jmp +158
acc +0
jmp +240
jmp +1
acc +5
acc +15
jmp +187
nop +563
jmp +51
acc -16
jmp +158
jmp +322
acc +47
nop -1
jmp +299
acc +26
acc +25
jmp +232
jmp -9
acc +15
jmp +54
jmp +558
acc +7
acc -7
jmp +399
nop +447
jmp +71
acc +26
acc +46
jmp +145
acc +38
acc +30
acc +21
jmp +263
acc +10
jmp +168
acc +22
nop +561
jmp -26
jmp +1
acc -7
jmp -5
acc +28
acc -6
jmp +370
jmp +94
acc +50
acc +42
acc -9
acc +30
jmp +70
acc +29
jmp +166
acc -5
acc -18
nop +84
acc +2
jmp +366
jmp -40
acc -4
acc -15
acc -1
jmp +169
jmp +1
acc -4
acc +0
jmp -45
nop -21
nop +241
acc -18
acc +19
jmp +26
nop -51
jmp +260
acc +17
jmp +428
acc +6
jmp +405
acc +22
acc +10
nop +471
jmp +352
acc -6
acc +48
acc +7
acc +3
jmp +57
acc -10
acc +16
acc +16
acc +43
jmp +432
acc -5
acc +0
nop +339
acc +49
jmp +17
acc +33
nop +166
acc -5
jmp +392
nop +246
acc -7
acc +21
acc +30
jmp +398
acc +36
acc +24
acc -15
acc -9
jmp +114
acc +19
jmp +11
acc +43
nop +182
jmp -129
nop -29
acc -6
acc +2
jmp +398
jmp +78
acc +36
jmp +393
acc +15
nop -11
acc -7
acc -9
jmp +76
acc +0
acc +27
jmp +25
acc +27
nop -54
jmp +458
acc +3
acc +29
acc -4
acc +43
jmp +413
acc +33
acc +13
jmp +382
jmp -83
acc +42
acc +24
jmp +64
acc +23
acc -13
nop +110
acc -5
jmp +114
jmp +113
nop +112
acc +26
jmp -133
jmp -12
jmp +1
jmp +330
acc +25
acc -1
acc +30
acc +42
jmp -187
jmp +1
acc +20
acc +35
acc +36
jmp -125
jmp +165
acc +28
acc -17
acc -12
jmp +1
jmp -120
nop +1
acc +2
acc +26
jmp +398
acc +20
acc -1
jmp -127
acc +36
acc +14
jmp +1
jmp +331
acc +50
acc +1
acc -10
nop +159
jmp -83
jmp +374
acc +17
jmp +372
acc +44
nop -39
jmp +228
acc +17
jmp +74
acc +16
acc +33
acc -2
jmp +152
jmp +29
acc +8
acc +27
nop +59
jmp -32
acc +28
jmp -227
nop -35
jmp -168
acc +13
nop +390
jmp -204
acc +16
acc +44
jmp -230
jmp +25
acc +30
jmp +383
acc -11
acc +38
acc +11
jmp +341
acc +35
acc +46
acc -1
jmp +94
acc -4
acc +12
jmp +111
jmp +133
nop +283
acc +13
acc +37
jmp +74
nop -218
jmp -178
acc +46
acc +25
acc -5
jmp -174
acc +28
acc +39
acc +36
acc +22
jmp -172
acc +19
jmp -250
nop +62
acc +44
nop +347
acc +40
jmp +345
acc -3
acc -13
acc -11
jmp +56
jmp -180
acc +17
acc -4
acc +46
nop -165
jmp +321
acc -4
jmp +1
acc +9
acc -12
jmp -155
acc +5
jmp -96
acc +0
acc -2
acc +38
jmp +67
acc -4
nop -283
acc +28
jmp +324
acc -9
acc +43
acc -1
acc +9
jmp -290
acc +3
acc +22
nop +84
acc -17
jmp -210
acc +7
jmp -260
nop -232
nop +87
acc +43
acc +36
jmp +96
jmp +238
acc +13
acc -14
acc +32
acc +11
jmp -146
acc +13
acc +37
acc -10
jmp +187
acc +49
acc +15
jmp -234
jmp -328
jmp -136
jmp +143
jmp +1
acc +27
acc +22
jmp +1
jmp -5
acc +30
nop -7
acc -6
jmp -71
acc -17
acc +15
jmp -52
jmp -126
acc -4
jmp +151
jmp +52
nop -86
acc +25
jmp +187
nop -22
jmp -219
acc +33
nop -120
acc +0
jmp +215
acc +46
acc +38
jmp +1
jmp -262
jmp +157
acc -15
acc +48
acc +39
acc +10
jmp -137
acc +47
acc +50
jmp -324
nop +214
acc +39
jmp -178
acc +49
acc -10
jmp -268
jmp +50
acc -14
nop -100
jmp +20
acc +45
acc -12
acc -4
jmp -208
acc -19
jmp -340
acc +36
nop -358
acc +5
jmp -348
acc +47
nop -18
acc -12
jmp -131
acc +19
acc +10
acc +19
acc +31
jmp -164
nop +162
nop -260
jmp +146
acc +32
acc -1
nop -14
jmp -192
acc +3
acc +31
nop -185
jmp -208
jmp -69
acc +43
acc +43
jmp -68
acc -16
acc +5
acc -9
jmp +126
acc +33
acc +2
acc +34
acc -9
jmp -16
acc +34
acc -19
jmp -266
nop +135
nop -389
acc +33
jmp -195
acc +48
jmp +1
acc -12
jmp +143
nop -317
acc -14
nop -127
acc +32
jmp -372
acc +24
nop -41
nop -42
jmp -344
acc +23
nop +117
nop +92
acc +42
jmp +143
acc +48
acc -6
nop -272
acc -13
jmp -379
acc -2
acc +44
acc +9
jmp -369
acc +6
acc +25
acc +34
jmp -301
nop -227
acc +43
jmp -141
acc +12
acc +41
acc +17
acc -11
jmp +29
jmp -121
acc +6
acc +7
acc +7
jmp +131
nop +144
nop -142
acc -13
acc -18
jmp +149
acc +14
acc +49
acc +25
acc -17
jmp -9
acc +26
acc -4
jmp -230
acc -18
acc +36
acc +27
nop -142
jmp +21
acc +34
nop +54
jmp -476
acc +10
jmp -174
nop -354
acc +1
jmp -324
acc +40
jmp +94
acc -12
jmp -136
nop -454
acc -14
jmp +116
acc +12
acc -1
nop -453
jmp -241
jmp -479
acc -19
jmp -87
acc +27
acc +48
acc +0
jmp -476
acc +16
acc +46
jmp -534
acc +0
jmp -344
acc +0
acc +28
jmp +10
jmp -248
nop -186
jmp +1
acc +26
jmp -153
acc +14
acc -8
nop -416
jmp -91
jmp -409
jmp -326
acc +2
acc +8
acc -18
acc +33
jmp -468
jmp -175
acc -7
acc +45
jmp -18
jmp -375
acc -8
jmp +28
acc -16
nop -38
acc +37
acc +48
jmp -343
acc +10
acc +26
acc -9
acc -16
jmp -348
acc +37
jmp -453
acc -2
acc +27
acc +17
acc +28
jmp -406
acc +25
acc +24
acc +44
acc +44
jmp -532
acc +10
jmp -531
acc +39
acc +40
jmp -284
acc +19
acc +3
nop -533
acc -3
jmp -162
nop -438
acc -5
jmp -114
acc +45
acc +1
acc +28
acc +9
jmp -550
jmp -222
jmp -106
acc -7
nop -263
nop -375
jmp -381
acc -4
nop -223
jmp -171
jmp -465
acc -2
nop -562
jmp -190
acc +40
jmp -4
acc +30
acc +21
jmp -435
acc +1
acc +10
jmp +1
jmp -157
acc -7
acc +18
acc -3
acc +24
jmp -113
acc +21
jmp -339
acc +34
jmp -563
acc +27
jmp -589
jmp -61
acc +35
acc +50
acc +8
jmp -553
acc +48
acc -15
acc +29
acc +24
jmp +1`
  ).split('\n')
}

exports = {}
