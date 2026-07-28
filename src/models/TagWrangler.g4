grammar TagWrangler;

expr: unary | parenth | binary;

parenth: LPAREN ( unary | binary) RPAREN;
binary: ( unary | parenth) ( (AND | OR) ( unary | parenth))*;
unary: NOT? OPCODE INPUT;

OPCODE: 'has' | 'is' | 'startsWith';

NOT: 'not';
AND: 'and';
OR: 'or';
LPAREN: '(';
RPAREN: ')';

INPUT: [a-zA-Z_]+;
WS: [ \t\r\n]+ -> skip;