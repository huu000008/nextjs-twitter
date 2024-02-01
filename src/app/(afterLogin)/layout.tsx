type props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};
export default function Layout({ children, modal }: props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
