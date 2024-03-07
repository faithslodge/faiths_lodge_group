import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

function CardOverflowComp({logo}) {
  return (
    <CardOverflow
      sx={{
        mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
        mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
        "--AspectRatio-radius": {
          xs: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
          sm: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))",
        },
      }}
    >
      {/* AspectRatio for setting Img Size/Ratio */}
      {/* need to fix for small screens */}
      <AspectRatio
        ratio="1"
        flex
        sx={{
          minWidth: { sm: 100 },
        }}
      >
        <img alt="" src={logo} />
      </AspectRatio>
    </CardOverflow>
  );
}

export default CardOverflowComp
