grammar TagWrangler;

expr: (binary | unary) ((AND | OR) (binary | unary))*;

unary: innerUnary | (ANY | ALL)? LPAREN innerUnary RPAREN;
innerUnary: NOT? OPCODE INPUT;

binary: innerBinary | LPAREN innerBinary RPAREN;
innerBinary: unary (AND | OR) unary;

OPCODE: 'has' | 'is' | 'startsWith';

NOT: 'not';
AND: 'and';
OR: 'or';
LPAREN: '(';
RPAREN: ')';
ANY: 'any';
ALL: 'all';

INPUT: [a-zA-Z_]+;
WS: [ \t\r\n]+ -> skip;