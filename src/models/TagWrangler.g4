grammar TagWrangler;

expr: (binary | unary) ((AND | OR) (binary | unary))*;

innerUnary: NOT? OPCODE INPUT;
unary: innerUnary | LPAREN innerUnary RPAREN;

innerBinary: unary (AND | OR) unary;
binary: innerBinary | LPAREN innerBinary RPAREN;

OPCODE: 'has' | 'is' | 'startsWith';

NOT: 'not';
AND: 'and';
OR: 'or';
LPAREN: '(';
RPAREN: ')';

INPUT: [a-zA-Z_]+;
WS: [ \t\r\n]+ -> skip;