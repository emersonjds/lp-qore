import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ControllerIdentity } from "../controller-identity";

const empty = { companyName: "", taxId: "", contactEmail: "", dataProtectionOfficer: "" };

describe("ControllerIdentity", () => {
  it("promises publication before the pilot while legal data is missing", () => {
    render(<ControllerIdentity legal={empty} />);
    expect(
      screen.getByText(
        "Os dados do controlador (razão social, CNPJ e canal do encarregado) serão publicados aqui antes da abertura do piloto.",
      ),
    ).toBeInTheDocument();
  });

  it("lists the controller once legal data exists", () => {
    render(
      <ControllerIdentity
        legal={{
          companyName: "Qore Tecnologia Ltda.",
          taxId: "11.222.333/0001-81",
          contactEmail: "privacidade@qore.com.br",
          dataProtectionOfficer: "Ana Lima",
        }}
      />,
    );
    expect(screen.getByText("Qore Tecnologia Ltda.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "privacidade@qore.com.br" })).toHaveAttribute(
      "href",
      "mailto:privacidade@qore.com.br",
    );
  });
});
