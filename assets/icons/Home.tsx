import { HugeiconsIcon } from '@hugeicons/react-native';


function Home(props: { strokeWidth: number }) {
  return (
    <HugeiconsIcon
        icon={Airplane01Icon} 
      size={24}
      color="#000000"
      strokeWidth={props.strokeWidth}
    />
  );
}

export default Home;
