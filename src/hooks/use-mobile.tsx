import * as React from "react"

// Definisikan breakpoint untuk mobile
const MOBILE_BREAKPOINT = 768

// Custom hook untuk menentukan apakah layar saat ini adalah mobile
export function useIsMobile() {
  // State untuk menyimpan status apakah layar adalah mobile atau tidak
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Menggunakan useEffect untuk menambahkan event listener ketika komponen di-mount
  React.useEffect(() => {
    // Membuat MediaQueryList object berdasarkan breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Fungsi yang akan dipanggil ketika ukuran layar berubah
    const onChange = () => {
      // Update state berdasarkan lebar jendela saat ini
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Menambahkan event listener untuk perubahan ukuran layar
    mql.addEventListener("change", onChange)
    
    // Set state awal berdasarkan lebar jendela saat ini
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Membersihkan event listener ketika komponen di-unmount
    return () => mql.removeEventListener("change", onChange)
  }, []) // Dependency array kosong berarti efek ini hanya berjalan sekali saat komponen di-mount

  // Mengembalikan nilai boolean apakah layar adalah mobile atau tidak
  return !!isMobile
}
