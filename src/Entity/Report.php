<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ReportRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 * @ApiResource(
 *    collectionOperations={ "GET"={"path"="/rapports"},
 *                         "POST"={"path"="/rapports", "security"="is_granted('ROLE_USER')", "security_message"=" Vous n'avez pas les droits suffisants pour effectuer cette opération"},
 *                        
 *                         
 * },
 * *  subresourceOperations={
*      "media_get_subresource"={"path"="/rapports/{id}/media"}
* },
 *    itemOperations={"GET"={"path"="/rappports/{id}"},  
 * },
 *  normalizationContext={
 *   "groups"={"reports_read"}
 * } 
 * )
 */
class Report
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *  @Groups({"reports_read","users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"reports_read","users_read","sites_read","medias_read"})
     * @Assert\NotBlank(message="Le titre du rapport doit etre renseigné ! ")
     * @Assert\Choice(choices={"COURANT","INCIDENT"}, message="Le titre du rapport doit etre  COURANT  ou INCIDENT"))
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reports_read","users_read","sites_read","medias_read"})
     * @Assert\Type( type="\DateTime",message="La date doit etre au format yyyy -MM-DD")
     * @Assert\NotBlank(message="La date de création du rapport  doit etre renseignée ")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="text" , nullable=false)
     * @Groups({"reports_read","users_read","sites_read","medias_read"})
     * @Assert\NotBlank(message="Le rapport doit avoir un minumum de description !")
     */
    private $description;
    
    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reports_read"})
     * @Assert\NotBlank(message="L'utilisateur  est obligatoire")
     * 
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Site::class, inversedBy="reports")
     * @Groups({"reports_read"})
     * @Assert\NotBlank(message="Le nom du site   est obligatoire")
     */
    private $site;

    /**
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="report")
     *  @Groups({"reports_read"})
     *  @ApiSubresource
     */
    private $media;

    public function __construct()
    {
        $this->media = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
   

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSite(): ?Site
    {
        return $this->site;
    }

    public function setSite(?Site $site): self
    {
        $this->site = $site;

        return $this;
    }

    /**
     * @return Collection|Media[]
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): self
    {
        if (!$this->media->contains($medium)) {
            $this->media[] = $medium;
            $medium->setReport($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): self
    {
        if ($this->media->contains($medium)) {
            $this->media->removeElement($medium);
            // set the owning side to null (unless already changed)
            if ($medium->getReport() === $this) {
                $medium->setReport(null);
            }
        }

        return $this;
    }

  
}