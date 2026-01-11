//  * Current structure:
//  * - app/_layout.tsx - Root layout
//  * - app/index.tsx - Login screen (entry point)
//  * - app/(tabs)/ - Tab-based screens (home, scan, history)
//  * - app/confirmation.tsx - Confirmation screen
//  * - app/item-detail.tsx - Item detail screen
//  * - app/search.tsx - Search screen
//  */

import RootLayout from './_layout';

export default function App() {
  return <RootLayout />;
}