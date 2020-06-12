<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SiteRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=SiteRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *   "groups"={"sites_read"}
 * } 
 * )
 */
class Site
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $streetNumber;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $streetName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $buildingName;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $postCode;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"sites_read","plannings_read","reports_read"})
     */
    private $city;

    /**
     * @ORM\OneToMany(targetEntity=Report::class, mappedBy="site")
     * @Groups({"sites_read"})
     * 
     */
    private $reports;

    /**
     * @ORM\OneToMany(targetEntity=Planning::class, mappedBy="site")
     * @Groups({"sites_read"})
     */
    private $plannings;

    public function __construct()
    {
        $this->reports = new ArrayCollection();
        $this->plannings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStreetNumber(): ?int
    {
        return $this->streetNumber;
    }

    public function setStreetNumber(int $streetNumber): self
    {
        $this->streetNumber = $streetNumber;

        return $this;
    }

    public function getStreetName(): ?string
    {
        return $this->streetName;
    }

    public function setStreetName(string $streetName): self
    {
        $this->streetName = $streetName;

        return $this;
    }

    public function getBuildingName(): ?string
    {
        return $this->buildingName;
    }

    public function setBuildingName(string $buildingName): self
    {
        $this->buildingName = $buildingName;

        return $this;
    }

    public function getPostCode(): ?int
    {
        return $this->postCode;
    }

    public function setPostCode(int $postCode): self
    {
        $this->postCode = $postCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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
            $report->setSite($this);
        }

        return $this;
    }

    public function removeReport(Report $report): self
    {
        if ($this->reports->contains($report)) {
            $this->reports->removeElement($report);
            // set the owning side to null (unless already changed)
            if ($report->getSite() === $this) {
                $report->setSite(null);
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
            $planning->setSite($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->plannings->contains($planning)) {
            $this->plannings->removeElement($planning);
            // set the owning side to null (unless already changed)
            if ($planning->getSite() === $this) {
                $planning->setSite(null);
            }
        }

        return $this;
    }
}
