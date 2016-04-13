const BLACK = {};
const WHITE = {};

BLACK.next = WHITE;
WHITE.next = BLACK;

export { BLACK, WHITE }
