<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 * 
 * collectionOperations={ 
 *            "GET"={"path"="/agents"},
 *            "POST"={"path"="/agents", "security"="is_granted('ROLE_ADMIN')", "security_message"="22 Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *            "checkCartePro"={"method"="post", "path"="/agents/checkCartePro", "controller"="App\Controller\UserFilterCarteProController"},
 *             
 *  },
 *                        
 *    itemOperations={
 *          "GET"={"path"="/agents/{id}"}, 
 *          "PUT"={"path"="/agents/{id}", "security"="is_granted('ROLE_ADMIN')", "security_message"="22 Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *          "DELETE"={"path"="/agents/{id}","security"="is_granted('ROLE_ADMIN')", "security_message"="22 Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *          
 *          
 * },
 * 
 *    subresourceOperations={
 *        "availabilities_get_subresource"={"path"="/agents/{id}/disponibilites"},
 *        "reports_get_subresource"={"path"="/agents/{id}/rapports"},
 *        "plannings_get_subresource"={"path"="/agents/{id}/plannings"},
 *        "services_get_subresource"={"path"="/agents/{id}/services"}
 *  },
 *    normalizationContext={
 *   "groups"={"users_read"}
 * } ,
 *  attributes={
 *      "pagination_enabled"=true,
 *      "pagination_items_per_page"=20 
 * }
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
 
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     * @Assert\NotBlank(message="L'email doit etre renseigné ! ")
     *@Assert\Email(message="L' adresse email doit avoir un format valide ! ")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe est obligatoire ")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     * @Assert\NotBlank(message="Le prénom  de l'agent est obligatoire")
     * @Assert\Length(min=3, minMessage="Le prénom doit faire entre 3  et 255 caractères", max=255,
     * maxMessage="Le prénom doit faire entre 3  et 255 caractères")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     * @Assert\NotBlank(message="Le nom de famille est obligatoire")
     * @Assert\Length(min=3, minMessage="Le nom  de famille doit faire entre 3 et 255 caractères ")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=1000)
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     * @Assert\NotBlank(message="La carte professionnelle doit étre composéé de 19 caractères ")
     * 
     * 
     */
    private $cardPro;

     /**
     * @ORM\Column(type="datetime")
     * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de création de la carte professionnnelle  doit etre renseignée ")
     * 
      */
      private $dateCreatedCarPro;

      /**
       * @ORM\Column(type="datetime")
       * @Groups({"users_read","plannings_read","reports_read","availabilities_read","services_read"})
       * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
       * @Assert\NotBlank(message="La date d'expiration de la carte professionnnelle  doit etre renseignée ")
       */
       private $expiryDateCardPro;

    /**
     * @ORM\OneToMany(targetEntity=Availability::class, mappedBy="user")
     * @Groups({"users_read"})
     * @ApiSubresource
     */
    private $availabilities;

    /**
     * @ORM\OneToMany(targetEntity=Planning::class, mappedBy="user")
     * @Groups({"users_read"})
     * @ApiSubresource
     */
    private $plannings;

    /**
     * @ORM\OneToMany(targetEntity=Report::class, mappedBy="user")
     * @Groups({"users_read"})
     * @ApiSubresource
     */
    private $reports;

    /**
     * @ORM\OneToMany(targetEntity=Service::class, mappedBy="user")
     * @Groups({"users_read"})
     * @ApiSubresource
     */
    private $services;

    public function __construct()
    {
        $this->availabilities = new ArrayCollection();
        $this->plannings = new ArrayCollection();
        $this->reports = new ArrayCollection();
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

   /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        //$roles[] = 'ROLE_USER';
        //return array_unique($roles);
        return $roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getCardPro(): ?string
    {
        return $this->cardPro;
    }

    public function setCardPro(string $cardPro): self
    {
        $this->cardPro = $cardPro;

        return $this;
    }

    /**
     * @return Collection|Availability[]
     */
    public function getAvailabilities(): Collection
    {
        return $this->availabilities;
    }

    public function addAvailability(Availability $availability): self
    {
        if (!$this->availabilities->contains($availability)) {
            $this->availabilities[] = $availability;
            $availability->setUser($this);
        }

        return $this;
    }

    public function removeAvailability(Availability $availability): self
    {
        if ($this->availabilities->contains($availability)) {
            $this->availabilities->removeElement($availability);
            // set the owning side to null (unless already changed)
            if ($availability->getUser() === $this) {
                $availability->setUser(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Planning[]
     */
    public function getPlannings(): Collection
    {
        return $this->plannings;
    }

    public function addPlanning(Planning $planning): self
    {
        if (!$this->plannings->contains($planning)) {
            $this->plannings[] = $planning;
            $planning->setUser($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->plannings->contains($planning)) {
            $this->plannings->removeElement($planning);
            // set the owning side to null (unless already changed)
            if ($planning->getUser() === $this) {
                $planning->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Report[]
     */
    public function getReports(): Collection
    {        
        return $this->reports;
    }

    public function addReport(Report $report): self
    {
        if (!$this->reports->contains($report)) {
            $this->reports[] = $report;
            $report->setUser($this);
        }

        return $this;
    }

    public function removeReport(Report $report): self
    {
        if ($this->reports->contains($report)) {
            $this->reports->removeElement($report);
            // set the owning side to null (unless already changed)
            if ($report->getUser() === $this) {
                $report->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): self
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
            $service->setUser($this);
        }

        return $this;
    }

    public function removeService(Service $service): self
    {
        if ($this->services->contains($service)) {
            $this->services->removeElement($service);
            // set the owning side to null (unless already changed)
            if ($service->getUser() === $this) {
                $service->setUser(null);
            }
        }

        return $this;
    }
    public function getDateCreatedCarPro(): ?\DateTimeInterface
    {
        return $this->dateCreatedCarPro;
    }

    public function setDateCreatedCarPro( $dateCreatedCarPro): self
    {
        $this->dateCreatedCarPro = $dateCreatedCarPro;

        return $this;
    }

    public function getExpiryDateCardPro(): ?\DateTimeInterface
    {
        return $this->expiryDateCardPro;
    }

    public function setExpiryDateCardPro($expiryDateCardPro): self
    {
        $this->expiryDateCardPro = $expiryDateCardPro;

        return $this;
    }
}

