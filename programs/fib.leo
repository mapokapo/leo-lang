% Fibonacci program in the Leo language

% x
ldv r0 #0
% y
ldv r1 #0
% z
ldv r2 #1

% index
ldv r3 #0

@loop
st r0 r3
add r0 r1 r2
ldv r1 r2
ldv r2 r0
add r3 r3 #1
cmp r2 #100
jmpne @loop
stop