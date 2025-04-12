/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Những domain được phép  truy cập tới tài nguyên của server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173', // khong cần locoalhost vì đã cho phép tất cả các domain trong môi trường dev
  'http://trello-web-kohl-nine.vercel.app'
  // ...vv ví dụ sau này sẽ deploy lên domain chính thức ...vv
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}