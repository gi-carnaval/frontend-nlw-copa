interface Props {
  code: string;
}

export function EmptyMyPoolList({ code }: Props) {
  return (
    <div flexWrap="wrap" justifyContent="center" p={4}>
      <span color="gray.200" fontSize="sm">
        Esse bolão ainda não tem participantes, que tal 
      </span>

      <button onPress={() => {}}>
          <p textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          compartilhar o código
          </p>
      </button>

      <span color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </span>

      <span color="gray.200" mr={1}>
        Use o código
      </span>
      
      <span color="gray.200" fontSize="sm" textAlign="center" fontFamily="heading"> 
        {code}
      </span>
    </div>
  );
}